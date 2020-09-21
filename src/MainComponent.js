import React, { PureComponent } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Grid from "@material-ui/core/Grid";

class MainUI extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      fileContent: [],
      uploaded: false,
      delimiter: ",",
      line: 2,
    };
  }

  onDelete = () => {
    this.setState({
      selectedFile: null,
      fileContent: [],
      uploaded: false,
    });
  };

  onChange = async (file) => {
    let reader = new FileReader();

    if (file[0]) {
      await reader.readAsText(file[0]);

      reader.addEventListener("load", () => {
        console.log(reader.result.split("\n"));
        this.setState({
          selectedFile: file[0],
          fileContent: reader.result.split("\n"),
          uploaded: true,
        });
      });
    }
  };

  render() {
    return (
      <div>
        <Grid
          container
          justify="center"
          alignItems="flex-center"
          style={{ marginBottom: "5px" }}
        >
          <Grid item xs={10} lg={5}>
            <DropzoneArea
              filesLimit={1}
              showAlerts={false}
              onChange={this.handleChange}
              dropzoneText="Drag and Drop here"
              onChange={this.onChange}
              onDelete={this.onDelete}
            ></DropzoneArea>
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          spacing={4}
          style={{ margin: "auto" }}
          lg={5}
          xs={10}
        >
          <Grid item>
            <label for="delimiter">Delimiter: </label>
            <input
              type="text"
              id="delimiter"
              value={this.state.delimiter}
              onChange={(e) =>
                this.setState({
                  delimiter: e.target.value,
                })
              }
            ></input>
          </Grid>
          <Grid item>
            <label for="line">Line: </label>
            <input
              type="text"
              id="line"
              value={this.state.line}
              onChange={(e) =>
                this.setState({
                  line: e.target.value,
                })
              }
            ></input>
          </Grid>
          <Grid item lg={8}>
            {this.state.uploaded && this.state.selectedFile ? (
              <table style={{ width: "100%" }}>
                {this.state.fileContent
                  .slice(0, this.state.line)
                  .map((elem) => (
                    <tr>
                      {elem
                        .split(this.state.delimiter || "dummydelimiter")
                        .slice(0, 4)
                        .map((item, innerIndex) =>
                          elem.split(this.state.delimiter || "dummyDelimiter")
                            .length ===
                          innerIndex + 1 ? (
                            <td colSpan={4 - innerIndex}>{item}</td>
                          ) : (
                            <td>{item}</td>
                          )
                        )}
                    </tr>
                  ))}
              </table>
            ) : (
              console.log("Hello")
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default MainUI;
