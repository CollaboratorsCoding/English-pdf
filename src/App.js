import React from 'react';

import { Button } from 'semantic-ui-react';
import { Document, Page, pdfjs } from 'react-pdf';
import './App.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { spawn } from 'child_process';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

class App extends React.Component {
  state = {
    showPopup: false,
    loading: false,
    popup: {
      originalText: '',
      translatedText: '',
      position: {}
    }
  };
  componentDidMount() {
    document.onmouseup = () => {
      const selection = window.getSelection();
      const selectedText = selection.toString();
      if (!!selectedText && selectedText !== this.state.popup.originalText) {
        this.addPopupTranslation(
          selectedText,
          selection.getRangeAt(0).getBoundingClientRect()
        );
      } else {
        this.setState({
          showPopup: false,
          popup: {
            originalText: '',
            translatedText: '',
            position: {}
          }
        });
      }
    };
  }

  addPopupTranslation = (text, position) => {
    this.setState({
      loading: true,
      showPopup: true,
      popup: {
        ...this.state.popup,
        position
      }
    });
    fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=en|ukr`)
      .then(res => res.json())
      .then(({ responseData, matches }) => {
        this.setState({
          popup: {
            ...this.state.popup,
            originalText: text,
            translatedText: responseData.translatedText
          },
          loading: false
        });
      });
  };
  render() {
    const {
      loading,
      showPopup,
      popup: {
        originalText,
        translatedText,
        position: { left, top, height }
      }
    } = this.state;

    return (
      <div className="layout">
        <header className="header">Header</header>
        <section className="content">
          {' '}
          {showPopup && (
            <div
              className="popup"
              style={{
                position: 'absolute',
                top: `${top - 40 + window.scrollY}px`,
                left: `${left}px`,
                zIndex: 100
              }}
            >
              {loading ? (
                'Loading...'
              ) : (
                <span>
                  <strong>{originalText} - </strong>
                  <span>{translatedText}</span>
                </span>
              )}
            </div>
          )}
          <Document
            file={'./1000-words.pdf'}
            onLoadSuccess={this.onDocumentLoadSuccess}
            onItemClick={({ pageNumber }) =>
              alert('Clicked an item from page ' + pageNumber + '!')
            }
          >
            <Page
              height={550}
              width={500}
              pageNumber={2}
              scale={2.5}
              renderMode="svg"
            />
          </Document>
        </section>
        <footer className="footer">Footer</footer>
      </div>
    );
  }
}

export default App;
