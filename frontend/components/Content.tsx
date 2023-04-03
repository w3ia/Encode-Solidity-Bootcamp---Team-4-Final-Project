import { Text, Spacer, Button } from "@nextui-org/react"
import { Box } from "./Box"

export const Content = () => (
  <Box css={{px: "$12", mt: "$8", "@xsMax": {px: "$10"}}}>
    <Text h2>Main</Text>
    <Text size="$lg">
      Please ensure you have a sufficient amount of Marking tokens before attempting to submit your own project or grade your fellow students projects.
    </Text>
    <Spacer y={1} />
    
    <Spacer y={1} />

    <Button color="gradient" auto>
    REQUEST TOKENS
        </Button>
        <Spacer y={1} />

    <Button color="gradient" auto>
    MY PROJECT
        </Button>
        <Spacer y={1} />

    <Button color="gradient" auto>
    COHORT PROJECTS
        </Button>
        <Spacer y={10} />

  </Box>
);
