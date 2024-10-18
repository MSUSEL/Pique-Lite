import React from 'react';
import { CheckCircledIcon, CrossCircledIcon, TrashIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text, Separator, Card } from '@radix-ui/themes';
import { UploadedFile } from "types";

interface FileVerifierProps {
  files: UploadedFile[];
  onRemove: (id: string) => void;
}

const FileVerifier: React.FC<FileVerifierProps> = ({ files, onRemove }) => {
  return (
    <Card variant="surface" size="3" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <Flex direction="column" gap="4" padding="4">
        <Text as="h2" size="4" weight="bold">
          Uploaded Files
        </Text>

        {files.length === 0 ? (
          <Text size="2" color="gray">
            No files uploaded
          </Text>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {files.map((file) => (
              <li key={file.id}>
                <Flex
                  align="center"
                  justify="between"
                  padding="2"
                  style={{
                    backgroundColor: '#f1f1f1',
                    borderRadius: '8px',
                    marginBottom: '8px',
                  }}
                >
                  <Flex align="center" gap="2">
                    {file.verified ? (
                      <CheckCircledIcon color="green" />
                    ) : (
                      <CrossCircledIcon color="red" />
                    )}
                    <Text size="3" weight="medium">
                      {file.name}
                    </Text>
                  </Flex>
                  <Button
                    variant="surface"
                    size="2"
                    onClick={() => {
                      console.log(`Removing file: ${file.name} (ID: ${file.id})`);
                      onRemove(file.id);
                    }}
                    aria-label={`Remove ${file.name}`}
                    radius="full"
                  >
                    <TrashIcon />
                  </Button>
                </Flex>
                <Separator />
              </li>
            ))}
          </ul>
        )}
      </Flex>
    </Card>
  );
};

export default FileVerifier;
