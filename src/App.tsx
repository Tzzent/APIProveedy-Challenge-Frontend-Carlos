import { format } from 'date-fns';
import ReactHtmlParser from 'react-html-parser';

import Topbar from './common/topbar/Topbar';
import Accordion from './components/Accordion';
import Container from './components/Container';
import { useApi } from './hooks/useApi';


export default function App() {
  const {
    isLoading,
    data: documents
  } = useApi();

  return (
    <div className='pb-10'>
      <Topbar />
      <Container>
        {isLoading &&
          <div
            className="
            w-full
            mt-40
            text-center
            "
          >
            <span>
              Loading...
            </span>
          </div>}
        {(!isLoading && documents)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          && documents.map((document: any) => (
            <Accordion
              key={document.document.id}
              head={
                <div className="flex justify-between w-full">
                  <h1
                    className="font-semibold uppercase"
                  >
                    {document.document.title}
                  </h1>
                  <a
                    onClick={(ev) => ev.stopPropagation()}
                    href={document.document.location_cloudfront}
                    target="_blank"
                  >
                    ⤵️ Download
                  </a>
                </div>
              }
              body={
                <div>

                  <div>
                    <h3 className="font-semibold">Summary:</h3>
                    <p>
                      {document.document.summary}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Keypoints:</h3>
                    <p>
                      {ReactHtmlParser(document.document.keypoints)}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Keywords:</h3>
                    <p className='text-sm'>
                      {document.document.keywords}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Clips: ({document?.clips?.length})
                    </h3>

                    {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      document?.clips?.map((clip: any) => (
                        <p
                          key={clip?.id}
                          className="
                      max-h-52
                      overflow-hidden
                      overflow-y-auto
                      "
                        >
                          {ReactHtmlParser(clip?.lyrics)}
                        </p>
                      ))}
                  </div>

                  <div className='my-5 font-serif italic'>
                    🕜 Published in {format(
                      new Date(document.document.created_at),
                      'dd/MM/yyyy HH:mm:ss')}
                  </div>
                </div>
              }
            />
          ))}
      </Container>
    </div>
  )
}
