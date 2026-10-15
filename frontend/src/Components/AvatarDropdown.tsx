import { useState } from 'react';
import { Avatar, Menu, MenuItem, IconButton, Tooltip, ListItemIcon } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useAuth } from './AuthContext';
// import { useNavigate } from 'react-router-dom';

export default function ProfileDropdown() {
  // State to track the anchor element for the menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const{ logout } = useAuth()

    // const navigate = useNavigate()

    // Open menu on avatar click
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    // Close menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    // const changePassword = () => {
    //     navigate('/ChangePassword')
    // };

    return (
        <>
        {/* tooltip: a small overlay text thta appears when the user hovers over the element */}
        <Tooltip title="Account settings">
            <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            >
            <Avatar
                sx={{ width: 30, height: 30 }}
            />
            </IconButton>
        </Tooltip>

        <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose} // Closes menu when any item is clicked
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            slotProps={{
            paper: {
                elevation: 0,
                sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1,
                },
            },
            }}
        >
            {/* <MenuItem onClick={changePassword}>
            <ListItemIcon>
                <Security fontSize="small" />
            </ListItemIcon>
            Change Password
            </MenuItem>

            <Divider /> */}

            <MenuItem onClick={logout}>
            <ListItemIcon>
                <Logout fontSize="small" />
            </ListItemIcon>
            Logout
            </MenuItem>
        </Menu>
        </>
    );
}