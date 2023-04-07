import VisibilityIcon from '@mui/icons-material/Visibility';
import PostAddIcon from '@mui/icons-material/PostAdd';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const statuses = [
    {status: 'DRAFT', icon: <PostAddIcon color='action'/>, title: 'Edit'},
    {status: 'PUBLISHED', icon: <VisibilityIcon color='action'/>, title:'Hide'},
    {status: 'HIDDEN', icon: <VisibilityOffIcon color='action'/>, title:'Publish'},
]