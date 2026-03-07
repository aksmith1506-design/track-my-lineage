import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: "900px", margin: "auto", padding: "40px" }}>

      <Link href="/" style={{ color: "#0077cc" }}>
        ← Home
      </Link>

      <div style={{ fontSize: "34px", fontWeight: "bold", marginTop: "20px" }}>
        Privacy Policy
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #e5e5e5",
          margin: "20px 0 30px"
        }}
      />

      <p style={{ color: "#555", marginBottom: "30px", lineHeight: "1.6" }}>
        This website is a public genealogy research archive dedicated to
        documenting family history and historical records. The goal of this
        archive is to preserve and share historical genealogical information
        for research and educational purposes.
      </p>

      {/* INFORMATION PUBLISHED */}

      <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>
        Information Published
      </div>

      <p style={{ marginTop: "10px", lineHeight: "1.6" }}>
        The information on this site consists primarily of historical
        genealogical data including names, family relationships, birth and
        death years, and archival documents such as photographs or records.
      </p>

      <p style={{ lineHeight: "1.6" }}>
        Information about deceased individuals is published for historical
        research purposes and is drawn from publicly available records or
        family sources whenever possible.
      </p>

      {/* LIVING INDIVIDUALS */}

      <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "30px" }}>
        Living Individuals
      </div>

      <p style={{ marginTop: "10px", lineHeight: "1.6" }}>
        This archive attempts to limit the publication of sensitive
        information about living individuals. If you believe information about
        a living person appears on this site and should be removed or
        corrected, please{" "}
        <Link href="/contact" style={{ color: "#0077cc" }}>
          contact the site administrator
        </Link>.
      </p>

      {/* PHOTOGRAPHS */}

      <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "30px" }}>
        Photographs and Documents
      </div>

      <p style={{ marginTop: "10px", lineHeight: "1.6" }}>
        Photographs and historical documents displayed on this site are
        included for genealogical and educational purposes. When possible,
        sources or contributors are cited.
      </p>

      <p style={{ lineHeight: "1.6" }}>
        If you believe a photograph or document should be removed due to
        copyright or privacy concerns, please{" "}
        <Link href="/contact" style={{ color: "#0077cc" }}>
          contact the site administrator
        </Link>.
      </p>

      {/* COOKIES */}

      <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "30px" }}>
        Cookies and Analytics
      </div>

      <p style={{ marginTop: "10px", lineHeight: "1.6" }}>
        This website currently does not use tracking cookies or analytics
        software. If analytics tools are added in the future, this privacy
        policy will be updated accordingly.
      </p>

      {/* EXTERNAL LINKS */}

      <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "30px" }}>
        External Links
      </div>

      <p style={{ marginTop: "10px", lineHeight: "1.6" }}>
        This site may link to external archives, historical databases, or
        genealogy resources. These sites operate independently and have their
        own privacy practices.
      </p>

      {/* CONTACT */}

      <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "30px" }}>
        Contact
      </div>

      <p style={{ marginTop: "10px", lineHeight: "1.6" }}>
        If you have questions about the information published on this site or
        wish to request a correction or removal, please{" "}
        <Link href="/contact" style={{ color: "#0077cc" }}>
          reach out through the contact page
        </Link>.
      </p>

      <p style={{ marginTop: "50px", fontSize: "14px", color: "#666" }}>
        Last updated: {new Date().getFullYear()}
      </p>
      

      <p style={{ marginTop: "50px", fontSize: "14px", color: "#666" }}>
        This website is a personal genealogy research project and is not affiliated with any commercial genealogy service.
      </p>

    </main>
  );
}