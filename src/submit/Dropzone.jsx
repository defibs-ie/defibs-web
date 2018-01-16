import React from 'react';
import { Button, colors } from 'react-elemental';
import BaseDropzone from 'react-dropzone';
import AddAPhoto from 'react-icons/lib/md/add-a-photo';

export default function Dropzone({
  file,
  handleClear,
  onDrop,
}) {
  return (
    <BaseDropzone
      accept="image/*"
      file={file}
      multiple={false}
      onDrop={onDrop}
      style={{
        alignItems: 'center',
        borderWidth: '2px',
        borderColor: colors.gray15,
        borderStyle: 'dashed',
        cursor: 'pointer',
        display: 'flex',
        height: file ? '400px' : '200px',
        justifyContent: 'space-around',
        position: 'relative',
      }}
    >
      {file
      ? (
        <div
          style={{
            alignItems: 'flex-start',
            backgroundImage: `url(${file.preview})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            bottom: 0,
            display: 'flex',
            height: '100%',
            justifyContent: 'flex-end',
            left: 0,
            overflowX: 'hidden',
            overflowY: 'hidden',
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        >
          <Button
            onClick={handleClear}
            style={{
              marginTop: '24px',
              marginRight: '24px',
            }}
            text="Clear"
          />
        </div>
      ) : (
        <AddAPhoto
          style={{
            color: colors.gray50,
            fontSize: '48px',
          }}
        />
      )}
    </BaseDropzone>
  );
}
