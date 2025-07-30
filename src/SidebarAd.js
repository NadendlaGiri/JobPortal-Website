import React from "react";

function SidebarAd() {
  const styles = {
    container: {
      position: "fixed",
      right: 0,
      top: "100px",
      width: "160px",
      zIndex: 999,
      padding: "10px",
      backgroundColor: "#fff",
      borderRadius: "10px 0 0 10px",
      boxShadow: "0 0 15px rgba(0,0,0,0.2)",
      display: "none", // default: hidden for mobile
    },
    image: {
      width: "100%",
      borderRadius: "8px",
    },
    mediaQuery: `
      @media (min-width: 768px) {
        .sidebar-ad {
          display: block !important;
        }
      }
    `,
  };

  return (
    <>
      <style>{styles.mediaQuery}</style>
      <div className="sidebar-ad" style={styles.container}>
        <img
          src="/sidebar-image.png"
          alt="Ad or Motivational Poster"
          style={styles.image}
        />
      </div>
    </>
  );
}

export default SidebarAd;
