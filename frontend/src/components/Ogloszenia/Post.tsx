import { Box, Typography } from "@mui/material";

type PostProps = {
  title: string;
  user: string;
  data: string;
  text: string;
  importance: number;
};

const Post = ({ title, user, data, text, importance }: PostProps) => {
  return (
    <Box>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="h6">
        Dodane przez: {user} dnia: {data}
      </Typography>
      <Typography variant="h4">{text}</Typography>
    </Box>
  );
};

export default Post;
