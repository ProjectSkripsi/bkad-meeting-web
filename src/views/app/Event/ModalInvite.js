import React, { useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  List,
  Table,
} from 'reactstrap';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  BlobProvider,
} from '@react-pdf/renderer';
import moment from 'moment';
import 'moment/locale/id';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  pagePrev: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  section: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  header: {
    fontSize: 20,
  },
  table: {
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #EEE',
    paddingTop: 8,
    paddingBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  // So Declarative and unDRY 👌
  row1: {
    width: '45%',
  },
  row2: {
    width: '50%',
  },
  row3: {
    width: '15%',
  },
  row4: {
    width: '20%',
  },
  row5: {
    width: '27%',
  },
  rowNo: {
    width: '5%',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #EEE',
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: 'bold',
    marginTop: 15,
  },
});

const MyDoc = ({ data, tanggal }) => {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Daftar Hadir Rapat</Text>
        </View>
        <View style={styles.section}>
          <Text>{tanggal}</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.container}>
            <Text style={styles.rowNo}>No.</Text>
            <Text style={styles.row1}>Nama</Text>
            <Text style={styles.row2}>Komisi</Text>
          </View>
          {data.map((row, i) => (
            <View key={i} style={styles.row} wrap={false}>
              <Text style={styles.rowNo}>{i + 1}</Text>
              <Text style={styles.row1}>
                <Text style={styles.bold}>{row.name}</Text>
              </Text>
              <Text style={styles.row2}>{row.unit.name}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

const ModalInvite = ({
  isOpen,
  setIsOpen,
  titleModal,
  data,
  tanggal,
  isBidang,
}) => {
  return (
    <>
      {isBidang ? (
        <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
          <ModalHeader>{titleModal}</ModalHeader>
          <ModalBody>
            <ul>
              {data &&
                data.map((item) => <li key={item._id}>{item?.name || ''}</li>)}
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' onClick={() => setIsOpen(false)}>
              Tutup
            </Button>
          </ModalFooter>
        </Modal>
      ) : (
        <Modal size='lg' isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
          <ModalHeader>{titleModal}</ModalHeader>
          <ModalBody>
            <Document>
              <Page size='A4' style={styles.pagePrev}>
                <View style={styles.section}>
                  <Text style={styles.header}>Daftar Hadir Rapat</Text>
                </View>
                <View style={styles.section}>
                  <Text>{moment(tanggal).format('LL')}</Text>
                </View>
                <View style={styles.table}>
                  <View style={styles.container}>
                    <Text style={styles.rowNo}>No.</Text>
                    <Text style={styles.row1}>Nama</Text>
                    <Text style={styles.row2}>Komisi</Text>
                  </View>
                  {data.map((row, i) => (
                    <View key={i} style={styles.row} wrap={false}>
                      <Text style={styles.rowNo}>{i + 1}</Text>
                      <Text style={styles.row1}>
                        <Text style={styles.bold}>{row.name}</Text>
                      </Text>
                      <Text style={styles.row2}>{row.unit.name}</Text>
                    </View>
                  ))}
                </View>
              </Page>
            </Document>
          </ModalBody>
          <ModalFooter>
            <PDFDownloadLink
              document={
                <MyDoc data={data} tanggal={moment(tanggal).format('LL')} />
              }
              fileName='somename.pdf'
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  'Loading document...'
                ) : (
                  <Button color='primary' onClick={() => setIsOpen(false)}>
                    Unduh
                  </Button>
                )
              }
            </PDFDownloadLink>
            <Button color='secondary' onClick={() => setIsOpen(false)}>
              Tutup
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default ModalInvite;
