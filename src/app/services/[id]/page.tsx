import { ServiceDetailClient } from "@/src/shared/components/ServiceDetailClient";

export default function ServiceDetail({
  params
}: {
  params: { id: string }
}) {
  return (
    <ServiceDetailClient id={params.id} />
  );
}

