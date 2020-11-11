import React from "react";
import { Container, Navbar } from "react-bootstrap";

export function Footer() {
  return (
    <footer style={{ position: "fixed", bottom: "0", width: "100%" }}>
      <Navbar
        bg="light"
        style={{ boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.1)" }}
      >
        <div style={{ width: "100%" }}>
          <Container className="my-2">
            <div>
              Powered by{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://yt-dl.org/"
              >
                youtube-dl
              </a>
              <span> and </span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://ffmpeg.org/"
              >
                ffmpeg
              </a>
            </div>
            <div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://yt-dl.org/supportedsites.html"
              >
                Supported sites
              </a>
            </div>
          </Container>
        </div>
      </Navbar>
    </footer>
  );
}
