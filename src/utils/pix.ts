// ============================================================================
// GERADOR OFICIAL DE PIX COPIA E COLA (PADRÃO BACEN EMVCo / BR CODE)
// Calcula payload válido com CRC16-CCITT para leitura em qualquer banco/app.
// ============================================================================

function stripAccents(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9 .\-]/g, '')
    .trim();
}

function formatTlv(id: string, value: string): string {
  const len = value.length.toString().padStart(2, '0');
  return `${id}${len}${value}`;
}

function computeCrc16Ccitt(payload: string): string {
  let crc = 0xffff;
  const polynomial = 0x1021;

  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ polynomial) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, '0');
}

export function normalizePixKey(rawKey: string): string {
  const trimmed = rawKey.trim();
  if (!trimmed) return '+5516990603561';

  // If it looks like a formatted Brazilian phone e.g. (16) 99060-3561 or +55 16 99060-3561
  if (/^\+55/.test(trimmed)) {
    const digits = trimmed.replace(/\D/g, '');
    return `+${digits}`;
  }
  if (/^\(\d{2}\)/.test(trimmed)) {
    const digits = trimmed.replace(/\D/g, '');
    return digits.startsWith('55') ? `+${digits}` : `+55${digits}`;
  }

  // If it's an email or UUID (EVP), keep trimmed lowercase/original
  if (trimmed.includes('@') || /^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(trimmed)) {
    return trimmed;
  }

  // If it has CPF/CNPJ punctuation, strip punctuation
  if (/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(trimmed) || /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(trimmed)) {
    return trimmed.replace(/\D/g, '');
  }

  return trimmed;
}

export interface GeneratePixParams {
  pixKey: string;
  merchantName?: string;
  merchantCity?: string;
  amount: number;
  txId?: string;
}

export function generatePixPayload({
  pixKey,
  merchantName = 'SMELL GOOD PERFUMARIA',
  merchantCity = 'SERTAOZINHO',
  amount,
  txId = 'SMELLGOOD',
}: GeneratePixParams): string {
  const cleanKey = normalizePixKey(pixKey);
  const cleanName = (stripAccents(merchantName) || 'SMELL GOOD').slice(0, 25).toUpperCase();
  const cleanCity = (stripAccents(merchantCity) || 'SERTAOZINHO').slice(0, 15).toUpperCase();
  const cleanTxId = (txId.replace(/[^a-zA-Z0-9]/g, '') || 'SMELLGOOD').slice(0, 25);

  // 00: Payload Format Indicator
  const f00 = formatTlv('00', '01');

  // 26: Merchant Account Information (GUI + Chave PIX)
  const gui = formatTlv('00', 'br.gov.bcb.pix');
  const key = formatTlv('01', cleanKey);
  const f26 = formatTlv('26', `${gui}${key}`);

  // 52: Merchant Category Code
  const f52 = formatTlv('52', '0000');

  // 53: Transaction Currency (986 = BRL)
  const f53 = formatTlv('53', '986');

  // 54: Transaction Amount
  const safeAmount = Number.isFinite(amount) && amount > 0 ? amount.toFixed(2) : '';
  const f54 = safeAmount ? formatTlv('54', safeAmount) : '';

  // 58: Country Code
  const f58 = formatTlv('58', 'BR');

  // 59: Merchant Name
  const f59 = formatTlv('59', cleanName);

  // 60: Merchant City
  const f60 = formatTlv('60', cleanCity);

  // 62: Additional Data Field Template (05 = txid)
  const f62 = formatTlv('62', formatTlv('05', cleanTxId));

  // 63: CRC16 placeholder + calculation
  const payloadWithoutCrc = `${f00}${f26}${f52}${f53}${f54}${f58}${f59}${f60}${f62}6304`;
  const crc = computeCrc16Ccitt(payloadWithoutCrc);

  return `${payloadWithoutCrc}${crc}`;
}
