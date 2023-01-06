import NodeRSA from "node-rsa";

class HashService {
  public encrypt(data: string) {
    const publicKey = process.env.PUBLIC_KEY as string;
    const key = new NodeRSA(publicKey);
    return key.encrypt(data, "base64");
  }
  public decrypt(data: string) {
    const privateKey = process.env.PRIVATE_KEY as string;
    const key = new NodeRSA(privateKey);
    return key.decrypt(data, "utf8");
  }
}

export { HashService };
