import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRouter } from "next/router";
import Error from "next/error";
import { InventoryContainer } from "../../components/Inventory/InventoryContainer";
import { LinearProgress } from "@mui/material";
import { naturalNumberPattern } from "../../helpers/inventoryHelpers";

export default function InventoryByPage() {
  const router = useRouter();

  if (router.query.page === undefined) return <LinearProgress />;

  const pageQuery = Number(router.query.page as string);
  const isBadRequest = !naturalNumberPattern.test(router.query.page as string);

  if (isBadRequest) return <Error statusCode={400} />;

  return <InventoryContainer pageQuery={pageQuery} />;
}
