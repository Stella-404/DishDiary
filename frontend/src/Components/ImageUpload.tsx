import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Typography from "@mui/joy/Typography";
import { styled } from "@mui/joy/styles";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Box } from "@mui/joy";

// Hide the native file input visually while keeping it accessible
const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
`;

// Define props interface so the parent can pass a callback function
interface ImageUploadProps {
    onUpdate: (data: { image: File | null }) => void;
}

export default function ImageUpload({ onUpdate }: ImageUploadProps) {
    // State for the selected file and preview URL
    const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
        setSelectedImage(file);
        // Create a local temporary URL for previewing the image
        setPreviewUrl(URL.createObjectURL(file));
        onUpdate({image: file}); // 👈 Notify parent component
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        if (previewUrl) {
        URL.revokeObjectURL(previewUrl); // Clean up memory
        setPreviewUrl(null);
        }
        onUpdate({image: null}); // 👈 Notify parent component that it's cleared
    };

    return (
        <FormControl sx={{ gap: 2, display: 'flex', flexDirection: 'row', }}>
        <FormLabel>Dish Image</FormLabel>
        {/* If no image is selected yet, show upload button */}
        {!previewUrl ? (
            <Button
            component="label"
            role={undefined}
            variant="outlined"
            color="neutral"
            tabIndex={-1}
            startDecorator={<ImageOutlinedIcon sx={{fontSize: 18,}} />}
            sx={{ width: 200, height: 10, borderStyle: "dashed", borderColor: '#2e332a', fontSize: 15, }}
            >
            Upload an Image
            <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
            </Button>
        ) : (
            /* If an image is selected, show preview with a remove option */
            <Box sx={{display: 'flex', flexDirection: "row", alignItems: "center", gap: 2,}}>
            <img
                src={previewUrl}
                alt="Dish Preview"
                style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
                }}
            />
            <Box>
                <Typography level="body-sm">{selectedImage?.name}</Typography>
                <Button
                size="sm"
                variant="soft"
                color="danger"
                startDecorator={<DeleteRoundedIcon />}
                onClick={handleRemoveImage}
                sx={{ width: "fit-content" }}
                >
                Remove Photo
                </Button>
            </Box>
            </Box>
        )}
        </FormControl>
    );
}