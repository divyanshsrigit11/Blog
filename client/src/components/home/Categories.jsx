import { Button, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { categories } from '../../constants/data';

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
                <Button className="btn-primary" fullWidth sx={{ py: 1.5 }}>
                    Create Blog
                </Button>
            </Link>
            
            <Table className="categories-table">
                <TableHead sx={{ bgcolor: '#f8fafc' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Categories</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Link to={"/"} className="category-link">All Categories</Link>
                        </TableCell>
                    </TableRow>
                    {categories.map(cat => (
                        <TableRow key={cat.id}>
                            <TableCell>
                                <Link to={`/?category=${cat.type}`} className="category-link">
                                    {cat.type}
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default Categories;