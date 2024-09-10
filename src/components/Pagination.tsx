import { Pagination as MuiPagination, Stack } from "@mui/material";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onChange,
}) => (
  <Stack spacing={2} alignItems="center" mt={4}>
    <MuiPagination
      count={totalPages}
      page={currentPage}
      onChange={onChange}
      color="primary"
      shape="rounded"
    />
  </Stack>
);

export default Pagination;
