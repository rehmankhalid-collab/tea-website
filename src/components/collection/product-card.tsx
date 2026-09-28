import { TeaBox } from "./tea-box";

export type Product = {
  number: string;
  name: string;
  note: string;
  weight: string;
  sealColor: string;
  signature?: boolean;
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <article data-collection-card className="flex flex-col items-center text-center">
      <div className="relative w-full max-w-[13rem]">
        <TeaBox name={product.name} number={product.number} sealColor={product.sealColor} />
        {product.signature && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-cream/25 bg-ink px-3 py-1 text-[0.6rem] font-medium tracking-[0.2em] text-stone uppercase">
            Signature
          </span>
        )}
      </div>

      <p className="mt-8 font-display text-xl text-stone italic">{product.number}</p>
      <h3 className="mt-1 font-display text-3xl tracking-tight">{product.name}</h3>
      <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-cream/65">{product.note}</p>
      <p className="mt-4 text-[0.65rem] tracking-[0.25em] text-stone uppercase">{product.weight}</p>
    </article>
  );
}
