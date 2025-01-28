import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Checkbox,
  Typography,
  IconButton,
  Avatar,
  Stack,
  Paper,
  Divider,
  Tooltip,
  AppBar,
  Toolbar,
} from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Email = ({ openDrawer , endpoint }) => {
  const [mails, setMails] = useState([]);
  const [selectedMails, setSelectedMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/${endpoint}` , {withCredentials: true});
        setMails(
          res.data.map((mail) => ({
            ...mail,
            starred: mail.starred || false, // Ensure starred field exists
          }))
        );
      } catch (error) {
        console.error("Error fetching emails:", error.message);
      }
    };

    fetchEmails();
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedMails(mails.map((mail) => mail.id));
    } else {
      setSelectedMails([]);
    }
  };

  const handleSelectMail = (id) => {
    setSelectedMails((prev) =>
      prev.includes(id) ? prev.filter((mailId) => mailId !== id) : [...prev, id]
    );
  };

  const toggleStarred = (id) => {
    setMails((prev) =>
      prev.map((mail) =>
        mail.id === id ? { ...mail, starred: !mail.starred } : mail
      )
    );
  };

  const handleDelete = () => {
    const remainingMails = mails.filter(
      (mail) => !selectedMails.includes(mail.id)
    );
    setMails(remainingMails);
    setSelectedMails([]);
  };

  const openMail = (mail) => {
    setSelectedMail(mail);
  };

  const closeMail = () => {
    setSelectedMail(null);
  };

  return (
    <Box
      sx={{
        marginLeft: openDrawer ? "250px" : "0",
        width: openDrawer ? "calc(100% - 290px)" : "97%",
        transition: "margin-left 0.3s ease, width 0.3s ease",
        padding: 2,
      }}
    >
      {selectedMail ? (
        <Box>
          <AppBar position="static" color="default" elevation={0}>
            <Toolbar>
              <IconButton onClick={closeMail}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6">Mail Details</Typography>
            </Toolbar>
          </AppBar>

          <Box sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              {selectedMail.subject}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              From: {selectedMail.from}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              To: {selectedMail.to}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Date: {new Date(selectedMail.date).toLocaleString()}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1">{selectedMail.body}</Typography>
          </Box>
        </Box>
      ) : (
        <>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Checkbox
                size="small"
                onChange={handleSelectAll}
                checked={mails.length > 0 && selectedMails.length === mails.length}
                indeterminate={
                  selectedMails.length > 0 && selectedMails.length < mails.length
                }
              />
              <Typography variant="subtitle1">Select All</Typography>
            </Stack>

            {selectedMails.length > 0 && (
              <Tooltip title="Delete Selected">
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </Stack>

          <Divider sx={{ my: 2 }} />

          {mails.map((mail) => (
            <Paper
              key={mail.id}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 1,
                mb: 1,
                backgroundColor: selectedMails.includes(mail.id)
                  ? "#f0f8ff"
                  : "#fff",
                cursor: "pointer",
              }}
              onClick={() => openMail(mail)}
            >
              <Checkbox
                size="small"
                checked={selectedMails.includes(mail.id)}
                onClick={(e) => e.stopPropagation()}
                onChange={() => handleSelectMail(mail.id)}
              />

              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStarred(mail.id);
                }}
              >
                {mail.starred ? (
                  <StarIcon color="warning" />
                ) : (
                  <StarOutlineIcon />
                )}
              </IconButton>

              <Avatar sx={{ width: 32, height: 32, mr: 2 }}>
                {mail.name[0].toUpperCase()}
              </Avatar>

              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" noWrap>
                  {mail.subject}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {mail.body}
                </Typography>
              </Box>

              {mail.hasAttachment && (
                <AttachFileIcon color="action" sx={{ mx: 2 }} />
              )}

              <Typography variant="body2" color="text.secondary">
                {new Date(mail.date).toLocaleDateString()}
              </Typography>
            </Paper>
          ))}

          {mails.length === 0 && (
            <Typography variant="h6" color="text.secondary" align="center">
              No emails to display.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default Email;
