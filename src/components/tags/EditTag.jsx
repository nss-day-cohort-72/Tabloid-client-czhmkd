import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { updateTag } from "../../managers/tagManager";

export const EditTagModal = ({ isOpen, toggle, tag, onTagUpdated }) => {
  const [tagName, setTagName] = useState(tag.name);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tagName.trim()) {
      alert("Tag name cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateTag(tag.id, { name: tagName.trim() });
      onTagUpdated(tag.id, tagName.trim()); // Update the list in parent
      toggle(); // Close modal
    } catch (error) {
      console.error("Error updating tag:", error);
      alert("Failed to update tag.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Tag</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="tagName">Tag Name</Label>
            <Input
              id="tagName"
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="Enter new tag name"
              disabled={isSubmitting}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Tag"}
          </Button>
          <Button color="secondary" onClick={toggle} disabled={isSubmitting}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};
