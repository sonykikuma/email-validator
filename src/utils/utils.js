export const disposableDomains = [
  "tempmail.com",
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "trashmail.com",
];

export const validateEmailFormat = (email) => {
  const parts = email.split("@");
  if (parts.length !== 2) return false; // Must contain exactly one "@"

  const localPart = parts[0];
  const domainPart = parts[1];

  // Split domain into name and extension (TLD)
  const domainParts = domainPart.split(".");
  if (domainParts.length < 2) return false; // Must have at least one "."

  if (domainPart.includes("..")) return false;

  if (localPart.length === 0) return false;

  for (let part of domainParts) {
    if (part.length === 0) return false;
  }

  // Check for valid TLD (at least 2 characters)
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2) return false;

  return true;
};

// this is a function to check if an email is from a disposable provider
export const isDisposableEmail = (email) => {
  const domain = email.split("@")[1];
  return disposableDomains.includes(domain);
};
