import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      className="
        relative 
        w-full 
        overflow-hidden
        /* モバイル：高さ＝横幅（正方形） */
        h-[100vw]
        /* タブレット以上：高さをビューポート高さの60%に */
        md:h-[60vh]
      "
    >
      {/* 背景 */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Mitsukabose Ramen"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* テキスト */}
      <div className="relative z-10 flex h-full w-full items-center justify-center text-center text-white p-4">
        <div className="max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome To Mitsukabose
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Experience the art of traditional Japanese miso ramen
          </p>
          <a
            href="menu"
            className="inline-block bg-primary text-white px-6 py-2 rounded-full text-base font-semibold hover:bg-primary-dark transition-colors"
          >
            View Menu
          </a>
        </div>
      </div>
    </section>
  );
}
