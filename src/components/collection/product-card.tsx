import Image, { type StaticImageData } from "next/image";

export type Product = {
  number: string;
  name: string;
  note: string;
  weight: string;
  image: StaticImageData;
  signature?: boolean;
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col items-center text-center">
      <div className="relative w-full max-w-[13rem]">
        {/* The extra padding + matching negative margin give the render's own
            drop-shadow room to sit outside the clipped area, so the curtain
            can fully cover the tin without visibly cropping the shadow. */}
        <div data-collection-box className="relative -m-10 overflow-hidden p-10">
          <Image
            src={product.image}
            alt={`${product.name} tea, in a Veyla wooden caddy`}
            className="w-full"
            sizes="(min-width: 1024px) 13rem, 40vw"
            placeholder="blur"
          />
          {/* The curtain: a solid panel matching the section background,
              lifted away like a stage curtain to reveal the tin beneath. */}
          <div data-collection-curtain aria-hidden="true" className="absolute inset-10 bg-ink" />
        </div>
        {product.signature && (
          <span
            data-collection-badge
            className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-cream/25 bg-ink px-3 py-1 text-[0.6rem] font-medium tracking-[0.2em] text-stone uppercase"
          >
            Signature
          </span>
        )}
      </div>

      <div data-collection-meta className="flex flex-col items-center">
        <p className="mt-8 font-display text-xl text-stone italic">{product.number}</p>
        <h3 className="mt-1 font-display text-3xl tracking-tight">{product.name}</h3>
        <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-cream/65">{product.note}</p>
        <p className="mt-4 text-[0.65rem] tracking-[0.25em] text-stone uppercase">{product.weight}</p>
      </div>
    </article>
  );
}
