import { db } from "@/db";
import { notFound } from "next/navigation";
import React from "react";
import DesignConfigrator from "./DesignConfigrator";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;
  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configration) {
    return notFound();
  }
  const { imageUrl, width, height } = configration;

  return (
    <DesignConfigrator
      configId={configration.id}
      imageDimension={{ width, height }}
      imageUrl={imageUrl}
    />
  );
};

export default Page;
