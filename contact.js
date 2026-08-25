const emailLink = document.getElementById("email-link");
if (emailLink) {
  const user = "davidly16";
  const host = ["gmail", "com"].join(".");
  emailLink.href = `mailto:${user}@${host}`;
}
