import QRCode from "qrcode";

export async function generateQRDataUrl(data: string): Promise<string> {
  return QRCode.toDataURL(data, {
    width: 300,
    margin: 2,
    color: {
      dark: "#1A1A1A",
      light: "#FEFCF9",
    },
  });
}
