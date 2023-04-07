import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Dialog, DialogContent, TextField } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styles from './Proofs.module.css'
import CloseIcon from '@mui/icons-material/Close';




export const Proofs = () => {
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
  return (
    <div>
    <Button onClick={handleOpen}>Open modal</Button>
    <Dialog open={open} onClose={handleClose}>
      <Tabs>
        <Tab label="WRITE"/>
        <Tab label="PREVIEW"/>
      </Tabs>
      <DialogContent>
              <TextField
                margin='dense'
                id="icon"
                label="Choose an icon"
                type="icon"
              />

              <TextField
                margin='dense'
                id="icon"
                label="Title of proof"
                type="icon"
              />

              <TextField
                margin='dense'
                id="icon"
                label="Add some annotation, what your proof is about?"
                type="icon"
                fullWidth
              />
              
              <TextField
                margin='dense'
                id="icon"
                label="Content of proof"
                type="icon"
                fullWidth
              />

              <Button
                type='submit'
                variant='contained'
                className={styles.publishButton}
              >Publish
              </Button>

              <Button
                type='submit'
                variant='contained'
                className={styles.saveButton}
              >Save changes
              </Button>
              
      </DialogContent>
      <CloseIcon className={styles.closeIcon} onClick={handleClose} />
    </Dialog>
  </div>
  )
}
