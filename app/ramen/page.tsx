import Link from "next/link";

export default function RamenPage() {
  // This page was consolidated into /menu. Keep a lightweight redirect link for discoverability.
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Ramen Menu Moved</h1>
        <p className="mb-6">The ramen menu has been consolidated into the main menu page.</p>
        <Link href="/menu" className="px-6 py-3 bg-amber-500 text-white rounded-full">View Full Menu</Link>
      </div>
    </main>
  );
}