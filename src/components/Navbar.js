import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "#1f2a35",
        padding: "12px 30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "white"
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "18px" }}>
        <Link href="/" style={{ color: "white", textDecoration: "none" }}>
          TrackMyLineage.com
        </Link>
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link href="/" style={{ color: "white" }}>Home</Link>
        <Link href="/tree" style={{ color: "white" }}>Tree</Link>
        <Link href="/people" style={{ color: "white" }}>People</Link>
        <Link href="/documents" style={{ color: "white" }}>Documents</Link>
        <Link href="/about" style={{ color: "white" }}>About</Link>
        <Link href="/contact" style={{ color: "white" }}>Contact Us</Link>
        <Link href="/privacy" style={{ color: "white" }}>Privacy</Link>
      </div>
    </nav>
  );
}