import React, { useRef } from 'react';

import IconButton from '@pages/apps/chat/app/components/buttons/icon';

import ImageRoundedIcon from '@mui/icons-material/ImageRounded';

type SelectImageProps = {
  className?: string;
  multiple?: boolean;
  onSelect?: (file: File, preview: string) => void;
}

const SelectImage: React.FC<SelectImageProps> = ({ className, multiple = false, onSelect }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const onSelectFile = (e) => {
    if (!onSelect) {
      return;
    }
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);

    onSelect(file, preview);
    inputRef.current.value = null;
  };

  return (
    <>
      <IconButton className={className} onClick={handleClick}>
        <ImageRoundedIcon />
      </IconButton>
      <input
        type="file"
        accept="image/*"
        hidden ref={inputRef}
        multiple={multiple}
        onChange={onSelectFile}
      />
    </>
  );
}

export default SelectImage;