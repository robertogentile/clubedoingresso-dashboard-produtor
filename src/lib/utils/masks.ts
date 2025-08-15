export type InputMaskName =
  | "cpf"
  | "cnpj"
  | "cpfCnpj"
  | "phone"
  | "cep"
  | "currencyBRL"
  | "currencyUSD"
  | "numeric";

function onlyDigits(value: string): string {
  return (value || "").replace(/\D+/g, "");
}

function maskCpf(value: string): string {
  const v = onlyDigits(value).slice(0, 11);
  return v
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskCnpj(value: string): string {
  const v = onlyDigits(value).slice(0, 14);
  return v
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

function maskCpfCnpj(value: string): string {
  const digits = onlyDigits(value);
  return digits.length <= 11 ? maskCpf(digits) : maskCnpj(digits);
}

export const inputMasks: Record<InputMaskName, (value: string) => string> = {
  cpf: maskCpf,
  cnpj: maskCnpj,
  cpfCnpj: maskCpfCnpj,
  phone: maskPhone,
  cep: maskCep,
  currencyBRL: maskCurrencyBRL,
  currencyUSD: maskCurrencyUSD,
  numeric: onlyDigits,
};

// Phone: (99) 99999-9999 or (99) 9999-9999
function maskPhone(value: string): string {
  const v = onlyDigits(value).slice(0, 11);
  if (v.length <= 10) {
    return v.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  }
  return v.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
}

// CEP: 99999-999
function maskCep(value: string): string {
  const v = onlyDigits(value).slice(0, 8);
  return v.replace(/(\d{5})(\d)/, "$1-$2");
}

// Currency helpers (pt-BR style: thousands with dots and decimal with comma)
function formatCurrencyFromDigits(digits: string, symbol: string): string {
  // Keep at most 13 integer digits + 2 cents to avoid overflow in UI
  const cleaned = onlyDigits(digits).slice(0, 15);
  if (!cleaned) return "";
  const intPart = cleaned.slice(0, Math.max(0, cleaned.length - 2));
  const cents = cleaned.slice(-2).padStart(2, "0");
  const withThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const integerDisplay = withThousands || "0";
  return `${symbol} ${integerDisplay},${cents}`.trim();
}

function maskCurrencyBRL(value: string): string {
  return formatCurrencyFromDigits(value, "R$");
}

function maskCurrencyUSD(value: string): string {
  return formatCurrencyFromDigits(value, "$ ");
}

export const masksUtils = {
  onlyDigits,
  maskCpf,
  maskCnpj,
  maskCpfCnpj,
  maskPhone,
  maskCep,
  maskCurrencyBRL,
  maskCurrencyUSD,
};
