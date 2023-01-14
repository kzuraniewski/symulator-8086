import GridBase, {
	Grid2Props as GridProps,
} from '@mui/material/Unstable_Grid2';

export default function Grid(props: GridProps) {
	return <GridBase display="flex" alignItems="stretch" {...props} />;
}
