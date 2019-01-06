import React, { Component, Fragment } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from "react-bootstrap";
const { ipcRenderer } = window.require("electron");

class App extends Component {
  submit = async event => {
    event.preventDefault();
    const url = event.target.url.value;
    const category = event.target.category.value;
    const name = event.target.name.value;
    ipcRenderer.send("download", {
      url,
      category,
      name
    });
  };
  render() {
    return (
      <Fragment>
        <Grid>
          <Row>
            <Col xs={10} xsOffset={1} md={6} mdOffset={3}>
              <div className="page">
                <h1
                  style={{
                    textAlign: "center",
                    marginTop: "40px",
                    marginBottom: "40px"
                  }}
                >
                  Youtube Playlist Downloader
                </h1>
                <form horizontal onSubmit={this.submit}>
                  <FormGroup bsSize="large">
                    <ControlLabel>Url</ControlLabel>
                    <FormControl name="url" />
                  </FormGroup>
                  <FormGroup bsSize="large">
                    <ControlLabel>Category</ControlLabel>
                    <FormControl name="category" />
                  </FormGroup>
                  <FormGroup bsSize="large">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl name="name" />
                  </FormGroup>
                  <FormGroup>
                    <Button
                      block
                      bsSize="large"
                      style={{ marginTop: "30px" }}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </FormGroup>
                </form>
              </div>
            </Col>
          </Row>
        </Grid>
      </Fragment>
    );
  }
}

export default App;
