import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Link,
  TextareaAutosize,
  Toolbar,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import CopyToClipboard from "./Copy";

function Footer() {
  return (
    <footer>
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="textSecondary" align="center">
          {" Open source project "}
          <Link color="inherit" href="https://github.com/atamano/pgn-sanitize">
            hosted on github
          </Link>
        </Typography>
      </Box>
    </footer>
  );
}

function Home() {
  const [rawPgn, setRawPgn] = useState("");
  const [sanitizedPgn, setSanitizedPgn] = useState("");

  useEffect(() => {
    setSanitizedPgn(rawPgn.replace(/(\r\n|\n|\r)/gm, " "));
  }, [rawPgn]);

  const onFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      if (!event || !event.target) {
        return;
      }
      const text = event.target.result;
      if (!text) {
        setRawPgn("");
        return;
      }
      const rawText = text as string;
      setRawPgn(rawText);
    };
    reader.readAsText(file);
  };

  const onClear = () => {
    setRawPgn("");
  };

  return (
    <main style={{ textAlign: "center" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            PGN Cleaner
          </Typography>
        </Toolbar>
      </AppBar>
      <section>
        <Container maxWidth="md">
          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h1" gutterBottom>
              Cleanup your chessbase PGN
            </Typography>
          </Box>
          <TextareaAutosize
            onChange={(e) => setRawPgn(e.target.value)}
            minRows={15}
            maxRows={15}
            placeholder="Copy and paste your PGN here"
            style={{ width: "100%" }}
            value={rawPgn}
          />
          <Dropzone
            onDrop={(acceptedFiles) =>
              !!acceptedFiles.length && onFileUpload(acceptedFiles[0])
            }
          >
            {({ isDragActive, getRootProps, getInputProps }) => (
              <Box {...getRootProps()} sx={{ mb: 4 }}>
                <Button
                  variant={isDragActive ? "contained" : "outlined"}
                  component="label"
                >
                  Or drop your file here
                  <input
                    {...getInputProps()}
                    onChange={(e) =>
                      e.target &&
                      e.target.files &&
                      !!e.target.files.length &&
                      onFileUpload(e.target.files[0])
                    }
                    hidden
                    type="file"
                  />
                </Button>
              </Box>
            )}
          </Dropzone>
          {!!sanitizedPgn && (
            <Stack spacing={4}>
              <Divider />
              <Box>
                <Typography variant="h6" component="h4" gutterBottom>
                  Cleaned PGN:
                </Typography>
                <CopyToClipboard>
                  {({ copy }) => (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => copy(sanitizedPgn)}
                    >
                      Copy result
                    </Button>
                  )}
                </CopyToClipboard>
                <Button
                  sx={{ ml: 1 }}
                  onClick={onClear}
                  color="warning"
                  variant="contained"
                  component="label"
                >
                  Reset
                </Button>
              </Box>
              <TextareaAutosize
                disabled
                value={sanitizedPgn}
                minRows={15}
                maxRows={15}
                placeholder="Result"
                style={{ width: "100%" }}
              />
            </Stack>
          )}
        </Container>
      </section>
      <Footer />
    </main>
  );
}

export default Home;
