export function sanitizeIndianMobile(input: string): string {
  return input
    .replace(/\D/g, "")
    .replace(/^91/, "")
    .slice(-10);
}

export function validateIndianMobile(input: string): string | null {
  const digits = sanitizeIndianMobile(input);
  if (digits.length === 0) return "Mobile number is required";
  if (digits.length !== 10) return "Enter a valid 10-digit mobile number";
  if (!/^[6-9]\d{9}$/.test(digits)) return "Mobile must start with 6, 7, 8 or 9";
  return null;
}

export function validateEmail(input: string): string | null {
  const v = input.trim();
  if (!v) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address";
  return null;
}

export function validateName(input: string): string | null {
  const v = input.trim();
  if (v.length < 2) return "Please enter your full name";
  if (!/^[a-zA-Z\s.'-]+$/.test(v)) return "Name can only contain letters";
  return null;
}
