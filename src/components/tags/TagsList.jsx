import React, { useEffect, useState } from "react";
import { deleteTag, getAllTags } from "../../managers/tagManager";
import {
  Button,
  Container,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { CreateTag } from "./CreateTag";
import { EditTagModal } from "./EditTag";

export const TagsList = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentTag, setCurrentTag] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await getAllTags();
        setTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  const toggleModal = () => setModalOpen(!modalOpen);

  const toggleEditModal = () => setEditModalOpen(!editModalOpen);

  const handleTagCreated = (newTag) => {
    setTags((prevTags) =>
      [...prevTags, newTag].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const handleTagUpdated = (id, updatedName) => {
    setTags((prevTags) =>
      prevTags.map((tag) =>
        tag.id === id ? { ...tag, name: updatedName } : tag
      )
    );
  };

  const handleTagDeleted = async (id) => {
    if (window.confirm("Are you sure you want to delete this tag")) {
      try {
        await deleteTag(id);
        setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
      } catch (error) {
        console.error("Error deleting tag:", error);
        alert("Failed to delete the tag.");
      }
    }
  };

  if (loading) {
    return (
      <Container className="mt-5">
        <p>Loading tags...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center">
            <CardTitle tag="h1">Tags</CardTitle>
            <Button color="primary" onClick={toggleModal}>
              Add Tag
            </Button>
          </div>
          <ListGroup>
            {tags.map((tag) => (
              <ListGroupItem
                key={tag.id}
                className="d-flex justify-content-between align-items-center"
              >
                <span className="text-capitalize">{tag.name}</span>
                <div className="d-flex align-items-center">
                  <Button
                    color="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setCurrentTag(tag);
                      toggleEditModal();
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => handleTagDeleted(tag.id)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
      <CreateTag
        isOpen={modalOpen}
        toggle={toggleModal}
        onTagCreated={handleTagCreated}
      />
      {currentTag && (
        <EditTagModal
          isOpen={editModalOpen}
          toggle={toggleEditModal}
          tag={currentTag}
          onTagUpdated={handleTagUpdated}
        />
      )}
    </Container>
  );
};
