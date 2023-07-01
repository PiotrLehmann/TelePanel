import { Box, Typography } from "@mui/material";

type PostProps = {
  title: string;
  user: string;
  data: string;
  text: string;
};

const Post = ({ title, user, data, text }: PostProps) => {
  return (
    <Box p={2} borderBottom={1} borderColor={"primary.main"} width="90%" mb={3}>
      <Typography variant="h5" textAlign="center" mb={0.5}>
        {title}
      </Typography>
      <Typography mb={1} fontStyle="italic" variant="subtitle2">
        {user} - {data}
      </Typography>
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
};

export default Post;
