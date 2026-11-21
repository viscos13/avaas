export interface PincodeInfo {
  pincode: string;
  city: string;
  state: string;
  deliveryDays: string;
  codAvailable: boolean;
  hub: string;
  expressAvailable: boolean;
}

const PINCODE_MAP: Record<string, PincodeInfo> = {
  "132103": {
    pincode: "132103",
    city: "Panipat",
    state: "Haryana",
    deliveryDays: "Same Day or Next Day Delivery",
    codAvailable: true,
    hub: "AAVAAS Flagship Mill & Central Dispatch (Panipat)",
    expressAvailable: true,
  },
  "110001": {
    pincode: "110001",
    city: "New Delhi (Connaught Place)",
    state: "Delhi NCR",
    deliveryDays: "1–2 Business Days",
    codAvailable: true,
    hub: "Delhi NCR Express Hub",
    expressAvailable: true,
  },
  "122002": {
    pincode: "122002",
    city: "Gurugram",
    state: "Haryana",
    deliveryDays: "1–2 Business Days",
    codAvailable: true,
    hub: "Delhi NCR Express Hub",
    expressAvailable: true,
  },
  "400001": {
    pincode: "400001",
    city: "Mumbai (Fort / South)",
    state: "Maharashtra",
    deliveryDays: "2–3 Business Days",
    codAvailable: true,
    hub: "Western India Regional Hub (Bhiwandi)",
    expressAvailable: true,
  },
  "560001": {
    pincode: "560001",
    city: "Bengaluru",
    state: "Karnataka",
    deliveryDays: "2–3 Business Days",
    codAvailable: true,
    hub: "South Regional Hub (Whitefield)",
    expressAvailable: true,
  },
  "500001": {
    pincode: "500001",
    city: "Hyderabad",
    state: "Telangana",
    deliveryDays: "2–3 Business Days",
    codAvailable: true,
    hub: "Deccan Express Hub",
    expressAvailable: true,
  },
  "700001": {
    pincode: "700001",
    city: "Kolkata",
    state: "West Bengal",
    deliveryDays: "3–4 Business Days",
    codAvailable: true,
    hub: "East India Distribution Center",
    expressAvailable: false,
  },
  "600001": {
    pincode: "600001",
    city: "Chennai",
    state: "Tamil Nadu",
    deliveryDays: "3–4 Business Days",
    codAvailable: true,
    hub: "Coromandel Logistics Center",
    expressAvailable: true,
  },
  "302001": {
    pincode: "302001",
    city: "Jaipur",
    state: "Rajasthan",
    deliveryDays: "2 Business Days",
    codAvailable: true,
    hub: "Rajasthan Logistics Hub",
    expressAvailable: true,
  },
  "160017": {
    pincode: "160017",
    city: "Chandigarh",
    state: "Punjab / Haryana",
    deliveryDays: "1–2 Business Days",
    codAvailable: true,
    hub: "Tri-City Hub",
    expressAvailable: true,
  },
};

export function checkDeliveryPincode(code: string): PincodeInfo | null {
  const clean = code.trim();
  if (clean.length !== 6 || !/^\d{6}$/.test(clean)) {
    return null;
  }

  if (PINCODE_MAP[clean]) {
    return PINCODE_MAP[clean];
  }

  // Generative fallback for any valid 6-digit Indian pincode
  return {
    pincode: clean,
    city: "All India Standard Coverage",
    state: "India",
    deliveryDays: "3–5 Business Days",
    codAvailable: true,
    hub: "Pan-India Express Air Cargo",
    expressAvailable: false,
  };
}
