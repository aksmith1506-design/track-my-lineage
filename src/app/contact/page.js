import Link from "next/link";

export default function ContactPage() {
  return (
    <main style={{ maxWidth: "900px", margin: "auto", padding: "40px" }}>

      <Link href="/" style={{ color: "#0077cc" }}>
        ← Home
      </Link>

      <div style={{ marginTop: "20px", fontSize: "34px", fontWeight: "bold" }}>
        Contact
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #e5e5e5",
          margin: "20px 0 30px"
        }}
      />

      <p style={{ color: "#555", marginBottom: "25px", fontSize: "16px" }}>
        This genealogy archive is an ongoing research project. If you have
        corrections, additional family information, photographs, or historical
        documents related to individuals on this site, please get in touch.
      </p>

      <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "25px" }}>
        Ways to Contribute
      </div>

      <ul style={{ marginTop: "10px", marginBottom: "30px", lineHeight: "1.6" }}>
        <li>Submit corrections to genealogical data</li>
        <li>Share family photographs or documents</li>
        <li>Provide additional historical context</li>
        <li>Report errors or broken information</li>
      </ul>

      <div style={{ fontSize: "22px", fontWeight: "bold" }}>
        Email
      </div>

      <p style={{ marginTop: "10px" }}>
        For inquiries or contributions, please email:
      </p>

      <p style={{ fontWeight: "bold", fontSize: "18px" }}>
        aksmith1506@gmail.com
      </p>

      <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "30px" }}>
        Privacy Requests
      </div>

      <p style={{ marginTop: "10px" }}>
        If you believe information about a living person should be removed or
        corrected, please contact the site administrator and the request will
        be reviewed promptly.
      </p>

    </main>
  );
}