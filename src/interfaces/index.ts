
export type ImageItemProps = {
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
};
export type CarsProps = {
  id: string;
  name: string;
  model: string;
  city: string;
  year: string;
  km: string;
  description: string;
  whatsapp: string;
  created?: string;
  price: string | number;
  owner?: string;
  uid: string;
  images: ImageItemProps[];
}
