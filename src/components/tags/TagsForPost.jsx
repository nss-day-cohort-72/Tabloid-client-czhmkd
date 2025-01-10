import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addTagsToPost,
  getAllTags,
  getTagsByPostId,
} from "../../managers/tagManager";
import {
  Button,
  Container,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";

export const TagsForPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const allTags = await getAllTags();
        const postTags = await getTagsByPostId(postId);

        console.log("All Tags Response:", allTags);
        console.log("Post Tags Response:", postTags);

        setTags(allTags || []);
        setSelectedTagIds(postTags ? postTags.map((tag) => tag.id) : []);
      } catch (err) {
        console.error("Error fetching tags:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [postId]);

  const handleSave = async () => {
    try {
      await addTagsToPost(postId, selectedTagIds);
      alert("Tags successfully updated!");
      navigate(`/posts/${postId}`);
    } catch (err) {
      console.error("Error saving tags:", err);
      alert("Failed to save tags. Please try again.");
    }
  };

  const handleTagSelection = (tagId) => {
    setSelectedTagIds((prevSelected) =>
      prevSelected.includes(tagId)
        ? prevSelected.filter((id) => id !== tagId)
        : [...prevSelected, tagId]
    );
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner color="primary" />
        <p>Loading tags...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <p className="text-danger">Error: {error.message}</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Manage Tags for Post</h2>
      <ListGroup>
        {tags.map((tag) => (
          <ListGroupItem key={tag.id}>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  checked={selectedTagIds.includes(tag.id)}
                  onChange={() => handleTagSelection(tag.id)}
                />
                {tag.name}
              </Label>
            </FormGroup>
          </ListGroupItem>
        ))}
      </ListGroup>
      <div className="d-flex justify-content-between mt-4">
        <Button color="primary" onClick={handleSave}>
          Save Tags
        </Button>
        <Button color="secondary" onClick={() => navigate(`/posts/${postId}`)}>
          Cancel
        </Button>
      </div>
    </Container>
  );
};
