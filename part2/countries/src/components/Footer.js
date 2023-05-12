const Footer = () => {
  return (
    <footer style={{ margin: "10px  0px" }}>
      Made by{" "}
      <a href="https://github.com/JoelEncinas" target="_blank" rel="noreferrer">
        Joel
      </a>{" "}
      - Powered by{" "}
      <a
        href="https://openweathermap.org/"
        title="Weather API"
        target="_blank"
        rel="noreferrer"
      >
        Openweathermap.org
      </a>
    </footer>
  );
};

export default Footer;
