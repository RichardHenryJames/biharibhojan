import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const FREE_DELIVERY_THRESHOLD = 399;
const DELIVERY_FEE = 39;

type IncomingItem = { slug: string; qty: number };

function str(v: unknown, max = 240) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function makeOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.floor(100 + Math.random() * 900);
  return `BB${stamp}${rand}`;
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const customerName = str(body.customerName, 80);
  const phone = str(body.phone, 20);
  const address = str(body.address, 300);
  const city = str(body.city, 80);
  const pincode = str(body.pincode, 10);
  const email = str(body.email, 120);
  const notes = str(body.notes, 300);
  const paymentMethod = str(body.paymentMethod, 20) || "COD";
  const items = Array.isArray(body.items) ? (body.items as IncomingItem[]) : [];

  // Boundary validation
  if (!customerName || customerName.length < 2)
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!/^[0-9+\-\s]{8,15}$/.test(phone))
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  if (!address || address.length < 8)
    return NextResponse.json({ error: "Please enter a full delivery address." }, { status: 400 });
  if (items.length === 0)
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });

  // Recompute totals server-side from trusted DB prices (never trust client prices)
  const slugs = [...new Set(items.map((i) => str(i.slug, 80)).filter(Boolean))];
  const products = await prisma.product.findMany({
    where: { slug: { in: slugs } },
  });
  const bySlug = new Map(products.map((p) => [p.slug, p]));

  let subtotal = 0;
  const lineItems: {
    slug: string;
    name: string;
    price: number;
    qty: number;
    isVeg: boolean;
  }[] = [];

  for (const i of items) {
    const p = bySlug.get(str(i.slug, 80));
    if (!p) continue;
    const qty = Math.max(1, Math.min(50, Math.floor(Number(i.qty) || 1)));
    subtotal += p.price * qty;
    lineItems.push({ slug: p.slug, name: p.name, price: p.price, qty, isVeg: p.isVeg });
  }

  if (lineItems.length === 0)
    return NextResponse.json(
      { error: "None of the items are available." },
      { status: 400 },
    );

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  try {
    const order = await prisma.order.create({
      data: {
        orderNumber: makeOrderNumber(),
        customerName,
        phone,
        email: email || null,
        address,
        city,
        pincode,
        notes: notes || null,
        paymentMethod,
        items: JSON.stringify(lineItems),
        subtotal,
        deliveryFee,
        total,
        status: "PLACED",
      },
    });

    return NextResponse.json({
      ok: true,
      orderNumber: order.orderNumber,
      subtotal,
      deliveryFee,
      total,
      eta: "35–50 min",
    });
  } catch (e) {
    console.error("POST /api/orders failed:", e);
    return NextResponse.json(
      { error: "Could not place your order. Please try again." },
      { status: 500 },
    );
  }
}

export async function GET() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  return NextResponse.json(orders);
}
