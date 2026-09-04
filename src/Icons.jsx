export function Icon({ name, className = "icon" }) {
  const common = {
    className,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  switch (name) {
    case "scales":
      return (
        <svg {...common}>
          <path d="M24 8v32M16 40h16" />
          <path d="M24 12h14l-4 10a6 6 0 1 1-12 0l4-10H24Zm0 0H10l4 10a6 6 0 1 0 12 0l-4-10H24Z" />
        </svg>
      );
    case "gears":
      return (
        <svg {...common}>
          <circle cx="20" cy="22" r="7" />
          <circle cx="31" cy="30" r="5" />
          <path d="M20 11v3M20 30v3M11 22h3M26 22h3M13.5 15.5l2 2M24.5 26.5l2 2M13.5 28.5l2-2M24.5 17.5l2-2" />
          <path d="M31 22v3M31 35v3M25 30h3M34 30h3" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M24 8 38 14v12c0 8-6.5 13.5-14 16-7.5-2.5-14-8-14-16V14L24 8Z" />
          <path d="m18 24 4 4 8-9" />
        </svg>
      );
    case "stars":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="14" />
          <path d="m24 14 1.6 4.8H31l-4.2 3 1.6 4.9L24 23.6l-4.4 3.1 1.6-4.9-4.2-3h5.4L24 14Z" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="14" />
          <path d="M10 24h28M24 10c4 4.5 6 9 6 14s-2 9.5-6 14c-4-4.5-6-9-6-14s2-9.5 6-14ZM16 16c5 2 11 2 16 0M16 32c5-2 11-2 16 0" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <path d="M10 38h28M14 38V20l10-8 10 8v18" />
          <path d="M22 38v-8h4v8M18 24h2M28 24h2M18 30h2M28 30h2" />
        </svg>
      );
    case "eye":
      return (
        <svg {...common}>
          <path d="M8 24s6-10 16-10 16 10 16 10-6 10-16 10S8 24 8 24Z" />
          <circle cx="24" cy="24" r="4" />
        </svg>
      );
    case "people":
      return (
        <svg {...common}>
          <circle cx="24" cy="16" r="5" />
          <circle cx="12" cy="18" r="3.5" />
          <circle cx="36" cy="18" r="3.5" />
          <path d="M10 34c0-4 3-7 8-7h12c5 0 8 3 8 7M8 32c0-3 2-5 5.5-5M40 32c0-3-2-5-5.5-5" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path d="M16 8h12l8 8v24H16V8Z" />
          <path d="M28 8v8h8M20 24h12M20 30h12M20 36h8" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M24 12a12 12 0 1 1-12 12h12V12Z" />
          <path d="M24 8v16h16" />
          <circle cx="34" cy="34" r="6" />
          <path d="M34 31v6M31.5 35.5 36 32" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path d="m16 16-8 8 8 8M32 16l8 8-8 8M27 12l-6 24" />
        </svg>
      );
    case "monitor":
      return (
        <svg {...common}>
          <rect x="8" y="10" width="32" height="22" rx="2" />
          <path d="M18 40h12M24 32v8M12 24h4l3-6 4 12 3-6h10" />
        </svg>
      );
    case "clipboard":
      return (
        <svg {...common}>
          <rect x="14" y="12" width="20" height="28" rx="2" />
          <path d="M18 12V9h12v3M20 24h8M20 30h8M19 20l3 3 6-6" />
        </svg>
      );
    case "external":
      return (
        <svg
          {...common}
          viewBox="0 0 24 24"
          className={`${className} icon-external`.trim()}
          width="16"
          height="16"
        >
          <path d="M9 5H5v14h14v-4" />
          <path d="M10 14 19 5M13 5h6v6" />
        </svg>
      );
    default:
      return null;
  }
}
