import Image from "next/image";

interface SmartImageProps {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
}

export function SmartImage({ src, alt, label, className = "", priority }: SmartImageProps) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
        priority={priority}
      />
      {label && (
        <span className="absolute bottom-3 left-3 bg-black/60 px-2 py-1 text-xs text-white/80 backdrop-blur">
          {label}
        </span>
      )}
    </div>
  );
}
