import { Box, Typography } from "@mui/material";

type PostProps = {
  title: string;
  user: string;
  data: string;
  text: string;
};

let date = new Date();

const Post = ({ title, user, text }: PostProps) => {
  return (
    <Box
      bgcolor={"primary.main"}
      p={2}
      borderRadius={5}
      borderColor={"primary.main"}
      width="90%"
      mb={3}
      color={"background.paper"}
    >
      <Typography fontWeight="bold" variant="h5" textAlign="center">
        {title}
      </Typography>
      <Typography
        mb={1}
        textAlign="center"
        fontStyle="italic"
        variant="subtitle2"
      >
        {user}
      </Typography>
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
};

export default Post;
