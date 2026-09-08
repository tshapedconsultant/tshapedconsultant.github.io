export default function Picture({
  src,
  avif,
  webp,
  alt,
  width,
  height,
  className,
  lazy = true,
}) {
  return (
    <picture className={className}>
      {avif ? <source type="image/avif" srcSet={avif} /> : null}
      {webp ? <source type="image/webp" srcSet={webp} /> : null}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={lazy ? "lazy" : undefined}
        fetchPriority={lazy ? undefined : "high"}
        decoding="async"
      />
    </picture>
  );
}

