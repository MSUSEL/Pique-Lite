import { PageHeader } from "../views/PageHeader";
import { FileUploader } from "../composites/FileUploader";
import { Box } from "@radix-ui/themes";

function Landing() {
  return (
    <Box>
      <PageHeader showUploader={false} />
      <FileUploader />
    </Box>
  );
}

export default Landing;
