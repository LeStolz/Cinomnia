import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { AccountViewProps } from "./Account";
import { Container, Button, Badge } from "react-bootstrap";
import { MyList } from "../MyList/MyList";
import { Edit } from "../../components/Edit";
import { MultiEdit } from "../../components/MultiEdit";
import { api } from "../../utils/api";

/*
"review"
"casts": [
"trailers": [],
"video_full":
bought
*/

export function AccountView({
  onSignout,
  changeAdmin,
  changeBalance,
  addBoughts,
  removeBoughts,
  id,
  editMode,
}: AccountViewProps) {
  const { getUser } = useAuth();
  const [user, setUser] = useState<any>();
  const [films, setFilms] = useState<any>([]);
  const [boughtFilms, setBoughtFilms] = useState<any>([]);

  useEffect(() => {
    (async () => {
      setUser(await getUser());
      setFilms((await api.get("/films")).data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (user?.email) {
        setBoughtFilms((await api.get(`users/bought/${user?.email}`)).data);
      }
    })();
  }, [user]);

  return (
    <Container>
      <div className="w-100 d-flex align-items-center">
        <h2 className="me-3">{id ? id : user?.email || ""}</h2>
        <Edit
          editMode={editMode}
          type="select"
          options={["admin", "client"]}
          name="type"
          defaultValue={user?.type}
          isRequired
          func={(x: any) => <Badge>{x}</Badge>}
          onChange={(x: any) => {
            changeAdmin(user?.email, x);
          }}
        />
        <span className="me-auto"></span>
        <Edit
          editMode={editMode}
          type="number"
          name="balance"
          defaultValue={user?.balance}
          isRequired
          func={(x: any) => (
            <h4>
              Balance: <span>{x}</span> VND
            </h4>
          )}
          onChange={(x: any) => changeBalance(user?.email, Number(x))}
        />

        {!id && (
          <Button variant="primary" onClick={onSignout}>
            Sign out
          </Button>
        )}
      </div>
      <hr></hr>
      <MyList></MyList>
      {editMode && (
        <div className="ms-5 mb-3">
          <span className="mb-5">Add bought films</span>
          {films && films.length !== 0 ? (
            <>
              <MultiEdit
                editMode={editMode}
                data={films.map((film: any) => ({
                  id: film.id,
                  name: film.title,
                }))}
                defaultValue={[]}
                name="films"
                func={(genres: any) =>
                  genres.map((_genre: any) => <span key={genres.id}></span>)
                }
                placeholder="Press enter to add a new film"
                icon="plus-circle"
                removeOnDone
                isRequired
                onChange={(films: any) => addBoughts(user?.email, films)}
              />
              <br></br>
              <span className="mb-5">Remove bought films</span>
              <MultiEdit
                editMode={editMode}
                data={boughtFilms.map((film: any) => ({
                  id: film.id,
                  name: film.title,
                }))}
                defaultValue={[]}
                name="boughtFilms"
                func={(genres: any) =>
                  genres.map((_genre: any) => <span key={genres.id}></span>)
                }
                placeholder="Press enter to remove a film"
                icon="x-circle"
                removeOnDone
                isRequired
                onChange={(films: any) => removeBoughts(user?.email, films)}
              />
            </>
          ) : (
            <span></span>
          )}
        </div>
      )}
    </Container>
  );
}
