import { Box, Typography } from "@mui/material";

export function Header() {
  const actualDay = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Box
      component={"header"}
      sx={{
        display: "flex",
        position: "relative",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h4" color={"teste"}>
        Teste
      </Typography>
      <Box
        sx={{
          position: "absolute",
          transform: "translateX(-50%)",
          left: "50%",
        }}
      >
        {actualDay}
      </Box>
    </Box>
  );
}
